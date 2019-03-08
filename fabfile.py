from fabric.api import *
import os

env.hosts = ['staging.starthere.com']
env.user = 'starthereuser'
env.path = '~/Path/to/site'
env.remotepath = '/path/to/site'
env.git_branch = 'staging'
env.warn_only = True
env.remote_protocol = 'http'

def production():
  env.hosts = ['starthere.com']
  env.user = 'starthereuser'
  env.remotepath = '/path/to/site'
  env.git_branch = 'master'
  env.remote_protocol = 'https'

def build():
  local('npx gulp --production')

def deploy():
  update()

def update():
  with cd(env.remotepath):
    run('git pull origin {0}'.format(env.git_branch))
