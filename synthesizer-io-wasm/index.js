// Copyright 2018 The Synthesizer IO Authors.
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const js = import("./pkg/synthesizer_io_wasm");

function startAudio() {
    console.log("starting audio");
    js.then(js => {
        let synth = js.Synth.new();

        var ctx = new AudioContext();

        let scriptNode = ctx.createScriptProcessor(256, 0, 1);
        let bufSize = scriptNode.bufferSize;
        synth.setup_saw(8.781);
        scriptNode.onaudioprocess = function(audioProcessingEvent) {
            let obuf = audioProcessingEvent.outputBuffer.getChannelData(0);
            synth.get_samples(obuf);
        };
        scriptNode.connect(ctx.destination);

    });
}

document.getElementById("btn").addEventListener('click', startAudio);
