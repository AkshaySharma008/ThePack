/**
 * @author Andy Gup
 *
 * Copyright 2016 Esri
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.​
 */
package com.esri.cordova.geolocation.fragments;

import android.app.AlertDialog;
import android.app.Dialog;
import android.app.DialogFragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;

public class GPSPermsDeniedDialogFragment extends DialogFragment{

    private static final String TAG = "GeolocationPlugin";

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState){

        final AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        final String message = "Without this permission the app will not retrieve location data. "
                + "Are you sure you want to deny this permission?";
        builder.setMessage(message)
                .setTitle("Permission Denied");
        builder.setPositiveButton("RE-TRY", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {

                try{
                    Intent settingsIntent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
                    Uri uri = Uri.fromParts("package", getActivity().getPackageName(), null);
                    settingsIntent.setData(uri);
                    getActivity().startActivity(settingsIntent);
                }
                catch (Exception exc){
                    Log.e(TAG, exc.getMessage());
                }
            }
        });
        builder.setNegativeButton("I'M SURE", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                GPSPermsDeniedDialogFragment.this.getDialog().cancel();
            }
        });

        final AlertDialog dialog = builder.create();

        return dialog;
    }


    @Override
    public void onDetach(){
        super.onDetach();
    }

}