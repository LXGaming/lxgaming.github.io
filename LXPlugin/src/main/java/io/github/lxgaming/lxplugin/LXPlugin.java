package io.github.lxgaming.lxplugin;

import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.plugin.java.JavaPlugin;

public class LXPlugin extends JavaPlugin {
	@Override
	public void onEnable() {
		getLogger().info("LXPlugin Has Started!");
	}
	
	@Override
	public void onDisable() {
		getLogger().info("LXPlugin Has Stopped!");
	}

public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		
		Player player = (Player) sender;
		
		if (cmd.getName().equalsIgnoreCase("Greeting") && sender instanceof Player) {
			player.sendMessage(ChatColor.BLUE + "Hello " + player.getName());
			return true;
		}
		
		if (cmd.getName().equalsIgnoreCase("LXRose") && sender instanceof Player) {
			ItemStack LXRose = new ItemStack(Material.RED_ROSE);
			ItemMeta LXR = LXRose.getItemMeta();
			LXR.setDisplayName("Rose From LX_Gaming");
			LXRose.setItemMeta(LXR);
			player.getInventory().addItem(LXRose);
			player.sendMessage(ChatColor.GREEN + "You Have Rececived A Rose From LX_Gaming");
			return true;	
		}
		return false;
	}
}
