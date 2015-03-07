package io.github.lxgaming.lxquest;

import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
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
	
	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		
		Player player = (Player) sender; 
		
		if (cmd.getName().equalsIgnoreCase("Quest") && sender instanceof Player) {
			player.sendRawMessage("List Of Commands");
			player.sendRawMessage("1 This command");
					
			return true;
		}
		
		return false;
	}
}
