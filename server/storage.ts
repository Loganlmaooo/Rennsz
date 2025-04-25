import { 
  users, 
  type User, 
  type InsertUser, 
  announcements, 
  type Announcement, 
  type InsertAnnouncement,
  streamSettings,
  type StreamSettings,
  type InsertStreamSettings,
  themeSettings,
  type ThemeSettings,
  type InsertThemeSettings,
  type CustomTheme,
  systemLogs,
  type SystemLog,
  type InsertSystemLog,
  webhookSettings,
  type WebhookSettings,
  type InsertWebhookSettings
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Announcement operations
  getAllAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, data: Partial<Announcement>): Promise<Announcement>;
  deleteAnnouncement(id: number): Promise<void>;
  
  // Stream operations
  getStreamerStatus(channel: string): Promise<any>;
  getAllStreamersStatus(): Promise<any>;
  getLiveStreamer(): Promise<any>;
  getStreamSettings(): Promise<StreamSettings | undefined>;
  updateStreamSettings(data: Partial<InsertStreamSettings>): Promise<StreamSettings>;
  getCurrentViewers(): Promise<{ viewers: number } | undefined>;
  getViewerMetrics(): Promise<any[]>;
  
  // Theme operations
  getThemeSettings(): Promise<ThemeSettings | undefined>;
  updateThemeSettings(data: Partial<InsertThemeSettings>): Promise<ThemeSettings>;
  
  // System logs and webhooks
  createSystemLog(log: InsertSystemLog): Promise<SystemLog>;
  getSystemLogs(limit?: number): Promise<SystemLog[]>;
  getRecentActivityLogs(limit?: number): Promise<SystemLog[]>;
  getWebhookSettings(): Promise<WebhookSettings | undefined>;
  updateWebhookSettings(data: InsertWebhookSettings): Promise<WebhookSettings>;
  
  // Stats and metrics
  getWebsiteVisits(): Promise<{ visits: number } | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private announcements: Map<number, Announcement>;
  private streamSettingsData: StreamSettings | undefined;
  private themeSettingsData: ThemeSettings | undefined;
  private logs: SystemLog[];
  private webhookSettingsData: WebhookSettings | undefined;
  
  private currentUserId: number;
  private currentAnnouncementId: number;
  private currentLogId: number;
  
  constructor() {
    this.users = new Map();
    this.announcements = new Map();
    this.logs = [];
    
    this.currentUserId = 1;
    this.currentAnnouncementId = 1;
    this.currentLogId = 1;
    
    // Initialize with default data
    this.initializeDefaultData();
  }
  
  private initializeDefaultData() {
    // Default stream settings
    this.streamSettingsData = {
      id: 1,
      featuredStream: "auto",
      customEmbedUrl: null,
      scheduleImageUrl: null,
      updatedAt: new Date(),
    };
    
    // Default theme settings
    this.themeSettingsData = {
      id: 1,
      currentTheme: "default",
      customTheme: null,
      backgroundImageUrl: null,
      updatedAt: new Date(),
    };
    
    // Default webhook settings
    this.webhookSettingsData = {
      id: 1,
      url: "https://discord.com/api/webhooks/1360625407740612771/2NBUC4S-X55I6FgdE-FMOwJWJ-XHRGtG_o2Q23EuU_XHzJKmy4xjx6IEsVpjYUxuQt4Z",
      logLevel: "info",
      realTimeLogging: true,
      lastBackup: null,
      updatedAt: new Date(),
    };
    
    // Create some sample announcements
    this.createAnnouncement({
      title: "Welcome to RENNSZ's Official Website!",
      content: "Thank you for visiting our new premium website. Stay tuned for the latest updates, stream announcements, and community events.",
      category: "general",
      isPinned: true,
    });
    
    this.createAnnouncement({
      title: "Special Stream This Weekend!",
      content: "Join us this Saturday at 8PM EST for a special 12-hour charity stream! We'll be raising money for Children's Hospital.",
      category: "event",
      isPinned: false,
    });
    
    this.createAnnouncement({
      title: "Schedule Change Notice",
      content: "Starting next week, our regular streams will begin at 7PM instead of 6PM. This change allows us to better accommodate viewers from different time zones.",
      category: "stream",
      isPinned: false,
    });
  }
  
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Announcement operations
  async getAllAnnouncements(): Promise<Announcement[]> {
    const announcements = Array.from(this.announcements.values());
    
    // Sort by isPinned (true first) and then by createdAt (newest first)
    return announcements.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }
  
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const announcement: Announcement = {
      ...insertAnnouncement,
      id,
      createdAt: new Date(),
    };
    
    this.announcements.set(id, announcement);
    
    // If this is pinned, unpin any other announcements
    if (announcement.isPinned) {
      for (const [otherAnnouncementId, otherAnnouncement] of this.announcements.entries()) {
        if (otherAnnouncementId !== id && otherAnnouncement.isPinned) {
          this.announcements.set(otherAnnouncementId, {
            ...otherAnnouncement,
            isPinned: false,
          });
        }
      }
    }
    
    return announcement;
  }
  
  async updateAnnouncement(id: number, data: Partial<Announcement>): Promise<Announcement> {
    const announcement = this.announcements.get(id);
    
    if (!announcement) {
      throw new Error(`Announcement with ID ${id} not found`);
    }
    
    const updatedAnnouncement = {
      ...announcement,
      ...data,
    };
    
    this.announcements.set(id, updatedAnnouncement);
    
    // If this is now pinned, unpin any other announcements
    if (data.isPinned) {
      for (const [otherAnnouncementId, otherAnnouncement] of this.announcements.entries()) {
        if (otherAnnouncementId !== id && otherAnnouncement.isPinned) {
          this.announcements.set(otherAnnouncementId, {
            ...otherAnnouncement,
            isPinned: false,
          });
        }
      }
    }
    
    return updatedAnnouncement;
  }
  
  async deleteAnnouncement(id: number): Promise<void> {
    this.announcements.delete(id);
  }
  
  // Stream operations
  async getStreamerStatus(channel: string): Promise<any> {
    // Mock implementation for demo purposes
    const isMainChannel = channel.toLowerCase() === "rennsz";
    const isGamingChannel = channel.toLowerCase() === "rennszino";
    
    // For a real implementation, this would call the Twitch API
    if (isMainChannel) {
      const isLive = Math.random() > 0.5; // Randomly determine if live for demo
      
      return {
        name: "RENNSZ",
        login: "rennsz",
        url: "https://www.twitch.tv/rennsz",
        isLive,
        profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=96&q=80",
        ...(isLive ? {
          title: "IRL Tokyo Exploration!",
          game: "Just Chatting",
          viewers: Math.floor(Math.random() * 2000) + 500,
          startedAt: new Date(Date.now() - Math.floor(Math.random() * 10800000)),
          thumbnail: "https://images.unsplash.com/photo-1502519144081-acca18599776?w=600&q=80",
        } : {})
      };
    } else if (isGamingChannel) {
      const isLive = Math.random() > 0.7; // Less chance to be live
      
      return {
        name: "RENNSZINO",
        login: "rennszino",
        url: "https://www.twitch.tv/rennszino",
        isLive,
        profileImage: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=96&q=80",
        ...(isLive ? {
          title: "Gaming Chill Stream",
          game: "Cyberpunk 2077",
          viewers: Math.floor(Math.random() * 1000) + 200,
          startedAt: new Date(Date.now() - Math.floor(Math.random() * 7200000)),
          thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
        } : {})
      };
    }
    
    return {
      isLive: false,
      name: channel,
      login: channel,
      url: `https://www.twitch.tv/${channel}`,
    };
  }
  
  async getAllStreamersStatus(): Promise<any> {
    const [main, gaming] = await Promise.all([
      this.getStreamerStatus("rennsz"),
      this.getStreamerStatus("rennszino"),
    ]);
    
    return { main, gaming };
  }
  
  async getLiveStreamer(): Promise<any> {
    const { main, gaming } = await this.getAllStreamersStatus();
    
    if (main.isLive) return main;
    if (gaming.isLive) return gaming;
    
    return null;
  }
  
  async getStreamSettings(): Promise<StreamSettings | undefined> {
    return this.streamSettingsData;
  }
  
  async updateStreamSettings(data: Partial<InsertStreamSettings>): Promise<StreamSettings> {
    if (!this.streamSettingsData) {
      this.streamSettingsData = {
        id: 1,
        featuredStream: data.featuredStream || "auto",
        customEmbedUrl: data.customEmbedUrl || null,
        scheduleImageUrl: data.scheduleImageUrl || null,
        updatedAt: new Date(),
      };
    } else {
      this.streamSettingsData = {
        ...this.streamSettingsData,
        ...data,
        updatedAt: new Date(),
      };
    }
    
    return this.streamSettingsData;
  }
  
  async getCurrentViewers(): Promise<{ viewers: number } | undefined> {
    // Mock implementation
    return { viewers: Math.floor(Math.random() * 2000) + 500 };
  }
  
  async getViewerMetrics(): Promise<any[]> {
    // Mock implementation - 7 days of viewer data
    const today = new Date();
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        viewers: Math.floor(Math.random() * 2000) + 500,
      });
    }
    
    return data;
  }
  
  // Theme operations
  async getThemeSettings(): Promise<ThemeSettings | undefined> {
    return this.themeSettingsData;
  }
  
  async updateThemeSettings(data: Partial<InsertThemeSettings>): Promise<ThemeSettings> {
    if (!this.themeSettingsData) {
      this.themeSettingsData = {
        id: 1,
        currentTheme: data.currentTheme || "default",
        customTheme: data.customTheme || null,
        backgroundImageUrl: null,
        updatedAt: new Date(),
      };
    } else {
      this.themeSettingsData = {
        ...this.themeSettingsData,
        ...data,
        updatedAt: new Date(),
      };
    }
    
    return this.themeSettingsData;
  }
  
  // System logs and webhooks
  async createSystemLog(insertLog: InsertSystemLog): Promise<SystemLog> {
    const id = this.currentLogId++;
    const log: SystemLog = {
      ...insertLog,
      id,
      timestamp: new Date(),
    };
    
    this.logs.push(log);
    
    // Limit logs array size to prevent memory issues
    if (this.logs.length > 1000) {
      this.logs = this.logs.slice(-1000);
    }
    
    return log;
  }
  
  async getSystemLogs(limit: number = 100): Promise<SystemLog[]> {
    return this.logs
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  async getRecentActivityLogs(limit: number = 10): Promise<SystemLog[]> {
    return this.logs
      .filter(log => log.level !== "error" || log.source !== "system") // Filter out system errors
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
  
  async getWebhookSettings(): Promise<WebhookSettings | undefined> {
    return this.webhookSettingsData;
  }
  
  async updateWebhookSettings(data: InsertWebhookSettings): Promise<WebhookSettings> {
    if (!this.webhookSettingsData) {
      this.webhookSettingsData = {
        id: 1,
        url: data.url,
        logLevel: data.logLevel || "info",
        realTimeLogging: data.realTimeLogging !== false,
        lastBackup: null,
        updatedAt: new Date(),
      };
    } else {
      this.webhookSettingsData = {
        ...this.webhookSettingsData,
        ...data,
        updatedAt: new Date(),
      };
    }
    
    return this.webhookSettingsData;
  }
  
  // Stats and metrics
  async getWebsiteVisits(): Promise<{ visits: number } | undefined> {
    // Mock implementation
    return { visits: Math.floor(Math.random() * 10000) + 5000 };
  }
}

export const storage = new MemStorage();
