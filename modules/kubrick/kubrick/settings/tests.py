from .common import *

# Using a non-persistent storage when testing, instead of the Azure Storages
DEBUG = True
DEFAULT_FILE_STORAGE = 'inmemorystorage.InMemoryStorage'
