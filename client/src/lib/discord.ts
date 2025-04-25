import { apiRequest } from "./queryClient";

const WEBHOOK_URL = "https://discord.com/api/webhooks/1360625407740612771/2NBUC4S-X55I6FgdE-FMOwJWJ-XHRGtG_o2Q23EuU_XHzJKmy4xjx6IEsVpjYUxuQt4Z";

interface LogOptions {
  title?: string;
  description: string;
  color?: number; // Discord embed color
  fields?: Array<{ name: string; value: string; inline?: boolean }>;
  footer?: { text: string; icon_url?: string };
  timestamp?: boolean;
}

export async function sendDiscordLog(options: LogOptions) {
  const { title, description, color = 0xD4AF37, fields, footer, timestamp } = options;
  
  try {
    const embed = {
      title: title || "RENNSZ Website Log",
      description,
      color,
      fields,
      footer: footer || { 
        text: "RENNSZ Website Logs", 
        icon_url: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=48&h=48&q=80" 
      },
      timestamp: timestamp ? new Date().toISOString() : undefined,
    };
    
    await apiRequest("POST", "/api/discord/log", { embeds: [embed] });
    return true;
  } catch (error) {
    console.error("Failed to send Discord log:", error);
    return false;
  }
}

export async function sendAdminLoginLog(username: string, success: boolean) {
  return sendDiscordLog({
    title: success ? "Admin Login Successful" : "Admin Login Failed",
    description: `User ${username} ${success ? "logged in successfully" : "failed to log in"}`,
    color: success ? 0x00FF00 : 0xFF0000,
    timestamp: true,
  });
}

export async function sendAdminActionLog(action: string, details: string) {
  return sendDiscordLog({
    title: "Admin Action",
    description: `**${action}**\n${details}`,
    color: 0x0099FF,
    timestamp: true,
  });
}

export async function sendSystemLog(type: "info" | "warning" | "error", message: string) {
  const colorMap = {
    info: 0x0099FF,
    warning: 0xFFCC00,
    error: 0xFF0000,
  };
  
  return sendDiscordLog({
    title: `System ${type.toUpperCase()}`,
    description: message,
    color: colorMap[type],
    timestamp: true,
  });
}

export async function sendStreamStatusLog(channelName: string, status: "live" | "offline") {
  return sendDiscordLog({
    title: `Stream Status Update`,
    description: `**${channelName}** is now **${status.toUpperCase()}**`,
    color: status === "live" ? 0xFF0000 : 0x808080,
    timestamp: true,
  });
}

export async function testDiscordWebhook() {
  return sendDiscordLog({
    title: "Webhook Test",
    description: "This is a test message to verify the Discord webhook integration is working correctly.",
    color: 0xD4AF37,
    timestamp: true,
  });
}
