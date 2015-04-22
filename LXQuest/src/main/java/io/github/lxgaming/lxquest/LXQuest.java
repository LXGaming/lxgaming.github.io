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
		int length = args.length;
		
		if (cmd.getName().equalsIgnoreCase("Quest") && sender instanceof Player) {
		if (length == 0) {
			player.sendMessage("Quest Commands");
			return true;
			
		} else {
		if (args[0].equalsIgnoreCase("Complete")) {
			player.sendMessage("Pick A Quest Number");
			return true;
		}
		if (args[0].equalsIgnoreCase("Current")) {
			player.sendMessage("I Need Diamonds!");
		} else {
			player.sendMessage("To Much Info!");
			return true;
		}
		}
		}
		return false;
	}
}
		