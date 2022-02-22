var conn = new signalR.HubConnectionBuilder().withUrl("/chat").build();

document.getElementById("sendBtn").disable = true;

conn.on("MessageReceived", (sender, msg) => {
    var card = document.createElement("div");
    card.classList.add("card");
    var cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);
    document.getElementById("msgs").appendChild(card);
    cardBody.textContent = sender + " : " + msg;
})

conn.start().then(() => {
    document.getElementById("sendBtn").disable = false;
}).catch(er => console.error(er.toString()));

document.getElementById("sendBtn").addEventListener("click", (e) => {
    var sender = document.getElementById("sender").value;
    var msg = document.getElementById("msg").value;
    conn.invoke("MsgSend", sender, msg)
        .catch(er => console.error(er.toString()));
    sender.value = "";
    e.preventDefault();
})