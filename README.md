# SynLogger server

SynLogger is a data logger that periodically measures parameters of its environment (for example air temperature or humidity) and sends them to a server via a custom TCP protocol. Each sample consists of a timestamp (microseconds since UNIX epoch) and all measured values.

Since SynLogger is a battery powered device, it is optimized to use as little power as possible. For this reason, it doesn't transmit every sample immediately. Instead, it accumulates multiple samples before transmitting them as a single message via TCP.

The message is sent as an UTF-8 stream, beginning with the ID of the logger (eg. `synlogger_aachen`).

After the ID, the logger will send a `\n` and continue with a CSV of all accumulated samples. Each sample starts with its timestamp followed by the measured values.

For example, a transmitted message may look like this:

```
synlogger_enschede\n
1694782976950754,2.7571134722237005,7.078464097370091,3.43060092481066,-0.8998320431792006\n
1694782976950778,9.24797309637157,-9.16547404332771,7.8038673770604845,-7.940538726952524\n
1694782976950792,6.1808168965652435,-4.266180825326424,1.2596126086419641,8.820806855274128\n
1694782976950804,-4.552485516563394,-0.8560569287340574,8.878356306572634,2.751407605259459\n
1694782976950816,-7.782922052702035,-8.4743336480559,-8.124275772838285,-2.767851504478145\n
1694782976950826,6.500475692306551,6.436198706006465,5.533037039597017,-5.709894367845044\n
1694782976950837,-3.2466246761728073,8.85514704764703,-9.439862058047314,1.0139187593653496\n
```

## Your task

Write a server in a language of your choice[^1] that speaks the SynLogger protocol. The server should listen on TCP port 8412.

For each received sample, it should write a JSON file into `data/<device-id>-<timestamp>.json`, containing just the array of received values.

Keep in mind that the server could be reachable from the internet. Try to keep it as robust as possible against malicious actors. In particular, consider that an attacker could inject deliberately crafted data via the TCP stream.

You can simulate a SynLogger using the included `./simulate_logger.py` script. This script will connect to `localhost:8412` and transmit a random number of samples.

[^1]: Valid choices are C/C++, Java, Python, Rust, TypeScript and zig.

## Some remarks

1. I chose not to write a lot of comments as they clutter up the code. However, I hope that every function and variable is clearly named to avoid ambiguity when reading the code. I will be more than happy to discuss my code in the technical interview.

2. I wrote the code from my work github account by accident (mohamadaltalli-mamahealth) and I will update the readme from my personal github account (TALLIY). Both accounts are fully mine and no one else was involved in writing the code.
