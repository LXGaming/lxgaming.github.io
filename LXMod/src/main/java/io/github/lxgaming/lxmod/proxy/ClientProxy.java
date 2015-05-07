package io.github.lxgaming.lxmod.proxy;

import io.github.lxgaming.lxmod.init.LXModItems;

public class ClientProxy extends CommonProxy{
	@Override
	public void registerRenders() {
		LXModItems.registerRenders();
	}
}
