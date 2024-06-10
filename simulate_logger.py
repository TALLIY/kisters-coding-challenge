#!/usr/bin/env python3

import random
import socket
import time

DEVICE_ID = "synlogger_aachen"
NUM_SAMPLES = random.randint(5, 10)
NUM_PARAMETERS = 4

s = socket.socket(
  socket.AF_INET,
  socket.SOCK_STREAM
)
s.connect(("localhost", 8412))
s.sendall(DEVICE_ID.encode())
s.sendall("\n".encode())

for _ in range(NUM_SAMPLES):
  timestamp = int(time.time() * 1_000_000)
  values = [str(timestamp)]
  for _ in range(NUM_PARAMETERS):
    values.append(str(random.uniform(-10.0, 10.0)))
  as_csv = ",".join(values)
  s.sendall(as_csv.encode())
  s.sendall(b"\n")

s.close()
