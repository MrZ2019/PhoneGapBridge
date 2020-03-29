package org.cordova.bridge;

import android.os.Bundle;

import org.apache.cordova.*;	//	cordova!
import org.cordova.bridge.R;

import android.view.Menu;

public class CordovaActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        String _pageurl = "file:///android_asset/www/index.html";
        
        super.loadUrl(_pageurl, 1001);
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.gap, menu);
        return true;
    }
    
}
