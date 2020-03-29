package org.cordova.bridge;

import org.apache.cordova.api.CordovaInterface;
import org.apache.cordova.api.Plugin;
import org.apache.cordova.api.PluginResult;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.ClipboardManager;
import android.content.Context;
import android.widget.Toast;

public class CordovaPlugin extends Plugin {

	@Override
	public PluginResult execute(String arg0, JSONArray arg1, String arg2) {
		// TODO Auto-generated method stub
		PluginResult result;
		
		try {
			String text = arg1.getString(0);
			copy(text);
			result = new PluginResult(PluginResult.Status.OK, "ok");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			//showText("¸´ÖÆÊ§°Ü");
			result = new PluginResult(PluginResult.Status.ERROR, "error");
		}
		
		return result;
	}
	
	
	public synchronized void copy(final String message) {
		
		final CordovaInterface cordova = this.cordova;
		
		Runnable runnable = new Runnable() {
			
			public void run() {
	    		ClipboardManager cb = (ClipboardManager)cordova.getActivity().getSystemService(Context.CLIPBOARD_SERVICE);
	    		cb.setText(message);		 						
			}
		};
		
		cordova.getActivity().runOnUiThread(runnable);
	}
}
