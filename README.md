Founders Map Quest
==================

Application skeleton generated with yeoman.

### Install required libraries ubuntu/debian
```bash
sudo npm install -g yo grunt-cli bower karma
npm install grunt-contrib-compass --save-dev
sudo apt-get install ruby-full libgemplugin-ruby
sudo su -c "gem install sass"
sudo su -c "gem install compass"
```

### Build application 
```bash
grunt
```

### Preview application 
```bash
grunt serve
```

### Run tests
```bash
grunt karma
```

### Error handling
If `grunt serve` throws warning
`Running "watch" task
Waiting...
Warning: watch ENOSPC`
then run
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
