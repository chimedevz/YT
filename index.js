const express = require('express');
const { spawn } = require('child_process');

const server = express();

const video = 'https://github.com/chimedevz/YT/raw/refs/heads/main/VID-20250107-WA0081.mp4'; // Ganti dengan path video
const audio = 'https://stream.synthwaveradio.eu/listen/synthwaveradio.eu/radio.mp3'; // Ganti dengan path audio
const streamkey = 'z6yg-xxhe-rujp-aa8d-0x70'; // Ganti dengan stream key Anda

const ffmpegCommand = [
  'ffmpeg',
  '-stream_loop', '-1',
  '-re',
  '-i', video,
  '-stream_loop', '-1',
  '-re',
  '-i', audio,
  '-vcodec', 'libx264',
  '-pix_fmt', 'yuvj420p',
  '-maxrate', '2048k',
  '-preset', 'ultrafast',
  '-r', '12',
  '-framerate', '1',
  '-g', '50',
  '-crf', '51',
  '-c:a', 'aac',
  '-b:a', '128k',
  '-ar', '44100',
  '-strict', 'experimental',
  '-video_track_timescale', '100',
  '-b:v', '1500k',
  '-f', 'flv',
  `rtmp://a.rtmp.youtube.com/live2/${streamkey}`,
];

const child = spawn(ffmpegCommand[0], ffmpegCommand.slice(1));

child.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

child.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

child.on('close', (code) => {
  console.log(`Child process exited with code ${code}`);
});

child.on('error', (err) => {
  console.error(`Child process error: ${err}`);
});

server.get('/', (req, res) => {
  res.send('Your Live Streaming Is All Ready Live');
});

server.listen(3000, () => {
  console.log('Live stream server is running on port 3000');
});
