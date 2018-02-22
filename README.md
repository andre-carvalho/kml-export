# kml-export
Tool to export my maps from google maps to KML including the coordinates when i make layers using  address geocoding.

# prerequisite

No install needed.

The expected environment is one linux with bash, a web navigator and internet connection.

## input data

One or more maps with a set of points over google application "My Maps":https://www.google.com/mymaps/

Use the load-data.sh shell script and My Maps share link to load raw data.
Tho exec this job, you need open the shell script file, load-data.sh, and paste the share link.

May need apply the exec permission to the shell script.

```shell
chmod + x load-data.sh
```

## generating KML files

Now, you will run one web browser and open the index.html file.
Finally, press the run button.
New buttons are displayed, as many as layers you have on your map.
Action this buttons to download the KML data, one to each layer.
