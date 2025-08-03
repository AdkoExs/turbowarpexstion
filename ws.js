(function(Scratch) {
    'use strict';

    const ws = new WebSocket("ws://localhost:8765");
    let latestCommand = "";

    ws.onmessage = (event) => {
        try {
            const msg = JSON.parse(event.data);
            latestCommand = msg.command || "";
        } catch (e) {
            console.error("Invalid message format", e);
        }
    };

    class WebSocketExtension {
        getInfo() {
            return {
                id: 'wsControl',
                name: 'WebSocket Control',
                blocks: [
                    {
                        opcode: 'getCommand',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'latest command'
                    },
                    {
                        opcode: 'clearCommand',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear command'
                    }
                ]
            };
        }

        getCommand() {
            return latestCommand;
        }

        clearCommand() {
            latestCommand = "";
        }
    }

    Scratch.extensions.register(new WebSocketExtension());
})(Scratch);
