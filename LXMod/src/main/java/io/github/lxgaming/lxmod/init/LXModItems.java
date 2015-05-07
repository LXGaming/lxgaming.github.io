package io.github.lxgaming.lxmod.init;

import io.github.lxgaming.lxmod.Reference;
import net.minecraft.client.Minecraft;
import net.minecraft.client.resources.model.ModelResourceLocation;
import net.minecraft.item.Item;
import net.minecraftforge.fml.common.registry.GameRegistry;

public class LXModItems {
	
	public static Item lx_item;
	
	public static void init()
	{
		lx_item = new Item().setUnlocalizedName("lx_item");
	}
	
	public static void register()
	{
		GameRegistry.registerItem(lx_item, lx_item.getUnlocalizedName().substring(5));
	}
	
	public static void registerRenders()
	{
		registerRender(lx_item);
	}
	
	public static void registerRender(Item item)
	{
		Minecraft.getMinecraft().getRenderItem().getItemModelMesher().register(item, 0, new ModelResourceLocation(Reference.MOD_ID + ":" + item.getUnlocalizedName().substring(5), "inventory"));
	}
}
