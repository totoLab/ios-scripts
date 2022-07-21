## Battery graphs
Program uses iPhone/iPad self-generated reports to graph how battery stats of the device change trough time.

### Configuration
The different fields to consider are specified in the config file ([template](template.conf)), along with the location of the directory in which log-aggregated* files are on filesystem.

The program assumes that config file path is `~/.config/ios-battery-graph.conf`.

### Running
After configuration you can run it with the following command:
`python graph_battery.py {device}` where `{device}` is the name of the device you want to see the stats of, previously specified in the configuration file.

If the configuration file contains only one device is not necessary to specify it.