export const sendMessage = async (message: string, webHookUrl: string) => {
    const response = await fetch("/api/hello", {
        method: "POST",
        body: JSON.stringify(
            {
                web_hook_url: webHookUrl,
                text: message
            }
        ), // Example data to send
    });
    return response.json();
};