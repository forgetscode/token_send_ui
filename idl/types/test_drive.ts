export type TestDrive = {
    "version": "0.1.0",
    "name": "test_drive",
    "instructions": [
      {
        "name": "sendSol",
        "accounts": [
          {
            "name": "sender",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "proxyTransfer",
        "accounts": [
          {
            "name": "sender",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "mint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "from",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "to",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ]
  };
  
  export const IDL: TestDrive = {
    "version": "0.1.0",
    "name": "test_drive",
    "instructions": [
      {
        "name": "sendSol",
        "accounts": [
          {
            "name": "sender",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "receiver",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "proxyTransfer",
        "accounts": [
          {
            "name": "sender",
            "isMut": false,
            "isSigner": true
          },
          {
            "name": "mint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "from",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "to",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      }
    ]
  };
  