from kubrick.settings import *

# Using a non-persistent storage when testing, instead of the Azure Storages
DEFAULT_FILE_STORAGE = 'inmemorystorage.InMemoryStorage'
