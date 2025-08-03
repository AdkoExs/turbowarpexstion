(function(Scratch) {
    const ws = new WebSocket("ws://192.168.1.5:8765"); // ← Replace this with your computer's local IP

    let latestCommand = "";

    ws.onopen = () => {
        console.log("WebSocket connected.");
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.command) {
                latestCommand = data.command;
                console.log("Received command:", latestCommand);
            }
        } catch (e) {
            console.error("Invalid JSON received:", e);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.warn("WebSocket connection closed.");
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
                        text: 'latest command',
                    },
                    {
                        opcode: 'clearCommand',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear command',
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
