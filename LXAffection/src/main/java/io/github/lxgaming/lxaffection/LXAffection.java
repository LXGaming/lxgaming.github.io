package io.github.lxgaming.lxaffection;

import org.bukkit.Bukkit;
import org.bukkit.ChatColor;
import org.bukkit.Material;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;
import org.bukkit.inventory.ItemStack;
import org.bukkit.inventory.meta.ItemMeta;
import org.bukkit.plugin.java.JavaPlugin;

public class LXAffection extends JavaPlugin {
	@Override
	public void onEnable() {
		getLogger().info("LXAffection Has Started!");
	}
	@Override
	public void onDisable() {
		getLogger().info("LXAffection Has Stopped!");
	}

	public boolean onCommand(CommandSender sender, Command cmd, String label, String[] args) {
		
		Player player = (Player) sender;
		int length = args.length;
		
		if (cmd.getName().equalsIgnoreCase("Heal") && sender instanceof Player) {	
			
			if (length == 1) {
				boolean playerFound = false;
				for (Player playertoHeal : Bukkit.getServer().getOnlinePlayers()) {
					if (playertoHeal.getName().equalsIgnoreCase(args[0])) {
						playertoHeal.setHealth(20);
						playertoHeal.sendMessage(ChatColor.GREEN + "You have been healed by " + player.getName() + "!");
						player.sendMessage(ChatColor.GREEN + playertoHeal.getName() + " was healed successfully!");
						playerFound = true;
						break;
					}
						return true;
				}
				
				if (playerFound == false) {
					player.sendMessage(ChatColor.RED + args[0] + " was not found!");
				}
			} else player.sendMessage(ChatColor.RED + "Incorrect Arguments!");
			
				return true;
	}
		
		if (cmd.getName().equalsIgnoreCase("Hug") && sender instanceof Player) {	
			
			if (length == 1) {
				boolean playerFound = false;
				for (Player playertoHug : Bukkit.getServer().getOnlinePlayers()) {
					if (playertoHug.getName().equalsIgnoreCase(args[0])) {
						playertoHug.sendMessage(ChatColor.GREEN + "You have received a hug from " + player.getName());
						player.sendMessage(ChatColor.GREEN + "You Hugged " + playertoHug.getName());
						playerFound = true;
						break;
					}
						return true;
				}
				
				if (playerFound == false) {
					player.sendMessage(ChatColor.RED + args[0] + " was not found!");
				}
			} else player.sendMessage(ChatColor.RED + "Incorrect Arguments!");
			
				return true;
	}
		
		if (cmd.getName().equalsIgnoreCase("Kiss") && sender instanceof Player) {	
			
			if (length == 1) {
				boolean playerFound = false;
				for (Player playertoKiss : Bukkit.getServer().getOnlinePlayers()) {
					if (playertoKiss.getName().equalsIgnoreCase(args[0])) {
						ItemStack RoseItem = new ItemStack(Material.RED_ROSE);
						ItemMeta RoseInfo = RoseItem.getItemMeta();
						RoseInfo.setDisplayName("Rose From " + player.getName());
						RoseItem.setItemMeta(RoseInfo);
						playertoKiss.getInventory().addItem(RoseItem);
						playertoKiss.sendMessage(ChatColor.GREEN + "You have received a kiss from " + player.getName());
						player.sendMessage(ChatColor.GREEN + "You Kissed " + playertoKiss.getName());
						playerFound = true;
						break;
					}
						return true;
				}
				
				if (playerFound == false) {
					player.sendMessage(ChatColor.RED + args[0] + " was not found!");
				}
			} else player.sendMessage(ChatColor.RED + "Incorrect Arguments!");
			
				return true;
	}
		return false;
	}

}
