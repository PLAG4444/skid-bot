const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const { proto } = require("@whiskeysockets/baileys/WAProto");
const {
  Curve,
  signedKeyPair,
} = require("@whiskeysockets/baileys/lib/Utils/crypto");
const {
  generateRegistrationId,
} = require("@whiskeysockets/baileys/lib/Utils/generics");
const { randomBytes } = require("crypto");

const initAuthCreds = () => {
  const identityKey = Curve.generateKeyPair();
  return {
    noiseKey: Curve.generateKeyPair(),
    signedIdentityKey: identityKey,
    signedPreKey: signedKeyPair(identityKey, 1),
    registrationId: generateRegistrationId(),
    advSecretKey: randomBytes(32).toString("base64"),
    processedHistoryMessages: [],
    nextPreKeyId: 1,
    firstUnuploadedPreKeyId: 1,
    accountSettings: {
      unarchiveChats: false,
    },
  };
};

const BufferJSON = {
  replacer: (k, value) => {
    if (
      Buffer.isBuffer(value) ||
      value instanceof Uint8Array ||
      value?.type === "Buffer"
    ) {
      return {
        type: "Buffer",
        data: Buffer.from(value?.data || value).toString("base64"),
      };
    }

    return value;
  },

  reviver: (_, value) => {
    if (
      typeof value === "object" &&
      !!value &&
      (value.buffer === true || value.type === "Buffer")
    ) {
      const val = value.data || value.value;
      return typeof val === "string"
        ? Buffer.from(val, "base64")
        : Buffer.from(val || []);
    }

    return value;
  },
};

module.exports = useSQliteauth = async (collection) => {
  const dbPath = path.join(collection)
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS auth_state (id TEXT PRIMARY KEY, data TEXT)",
    );
  });

  const writeData = (data, id) => {
    const informationToStore = JSON.parse(
      JSON.stringify(data, BufferJSON.replacer),
    );
    return new Promise((resolve, reject) => {
      db.run(
        "INSERT OR REPLACE INTO auth_state (id, data) VALUES (?, ?)",
        [id, JSON.stringify(informationToStore)],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },
      );
    });
  };

  const readData = async (id) => {
    return new Promise((resolve, reject) => {
      db.get("SELECT data FROM auth_state WHERE id = ?", [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row && row.data) {
          resolve(JSON.parse(row.data, BufferJSON.reviver));
        } else {
          resolve(null);
        }
      });
    });
  };

  const removeData = async (id) => {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM auth_state WHERE id = ?", [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  const creds = (await readData("creds")) || initAuthCreds();
  return {
    state: {
      creds,
      keys: {
        get: async (type, ids) => {
          const data = {};
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`);
              if (type === "app-state-sync-key") {
                value = proto.Message.AppStateSyncKeyData.fromObject(data);
              }
              data[id] = value;
            }),
          );
          return data;
        },
        set: async (data) => {
          const tasks = [];
          for (const category of Object.keys(data)) {
            for (const id of Object.keys(data[category])) {
              const value = data[category][id];
              const key = `${category}-${id}`;
              tasks.push(value ? writeData(value, key) : removeData(key));
            }
          }
          await Promise.all(tasks);
        },
      },
    },
    saveCreds: () => {
      return writeData(creds, "creds");
    },
  };
};