import shutil
from datetime import datetime
import os
import sys

today = datetime.now().strftime("%Y.%m.%dT%H.%M.%S")
dir_to_backup = "src/config"
backup_folder = "backup/" + today

shutil.copytree(dir_to_backup, backup_folder)