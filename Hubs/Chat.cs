using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace RealTimeAppSingleR.Hubs
{
    public class Chat: Hub
    {
        public async Task MsgSend(string sender, string msg)
        {
            await Clients.All.SendAsync("MessageReceived", sender, msg);
        }
    }
}