package io.github.lxgaming.lxquest;

import org.bukkit.plugin.java.JavaPlugin;

public class LXQuest extends JavaPlugin {
	@Override
	public void onEnable() {
		getLogger().info("LXQuest Has Started!");
	}
	
	@Override
	public void onDisable() {
		getLogger().info("LXQuest Has Stopped!");
	}
	public static void main(String[] args) {
		

	}

}
