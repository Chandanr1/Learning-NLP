document.addEventListener('DOMContentLoaded',()=>{
  initRps();
  initMemory();
  initTtt();
  initNumberGuess();
  initTyping();
});

function initRps(){
  const sec=document.querySelector('#rps');
  if(!sec) return;
  const you=document.getElementById('rps-you');
  const bot=document.getElementById('rps-bot');
  const result=document.getElementById('rps-result');
  const reset=document.getElementById('rps-reset');
  let ys=0,bs=0;
  sec.querySelectorAll('.choices .btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const player=btn.getAttribute('data-choice');
      const options=['rock','paper','scissors'];
      const ai=options[Math.floor(Math.random()*3)];
      const outcome = getRpsOutcome(player,ai);
      if(outcome>0){ys++;result.textContent=`You win! ${cap(player)} beats ${ai}.`}
      else if(outcome<0){bs++;result.textContent=`You lose! ${cap(ai)} beats ${player}.`}
      else{result.textContent=`Draw. You both chose ${player}.`}
      you.textContent=String(ys); bot.textContent=String(bs);
    });
  });
  reset.addEventListener('click',()=>{ys=0;bs=0;you.textContent='0';bot.textContent='0';result.textContent='Make your move!'});
  function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
  function getRpsOutcome(p,c){
    if(p===c) return 0;
    if((p==='rock'&&c==='scissors')||(p==='paper'&&c==='rock')||(p==='scissors'&&c==='paper')) return 1;
    return -1;
  }
}

function initMemory(){
  const grid=document.getElementById('memory-grid');
  if(!grid) return;
  const status=document.getElementById('memory-status');
  const reset=document.getElementById('memory-reset');
  let first=null,second=null,lock=false,matched=0;
  const icons=['🍎','🍌','🍇','🍓','🍊','🍉','🍑','🍍'];
  function setup(){
    grid.innerHTML=''; first=second=null; lock=false; matched=0; status.textContent='Find all the pairs';
    const pairs=[...icons,...icons].sort(()=>Math.random()-0.5);
    pairs.forEach(symbol=>{
      const div=document.createElement('div');
      div.className='memory-card';
      div.dataset.symbol=symbol;
      div.textContent='?';
      div.addEventListener('click',()=>{
        if(lock||div.classList.contains('revealed')||div.classList.contains('matched')) return;
        div.classList.add('revealed');
        div.textContent=symbol;
        if(!first){first=div;return;}
        second=div; lock=true;
        if(first.dataset.symbol===second.dataset.symbol){
          first.classList.add('matched'); second.classList.add('matched'); matched+=1; lock=false; first=second=null;
          if(matched===icons.length){status.textContent='Great job! All pairs matched.'}
        }else{
          setTimeout(()=>{
            first.classList.remove('revealed'); first.textContent='?';
            second.classList.remove('revealed'); second.textContent='?';
            first=second=null; lock=false;
          },700);
        }
      });
      grid.appendChild(div);
    });
  }
  reset.addEventListener('click',setup);
  setup();
}

function initTtt(){
  const grid=document.getElementById('ttt-grid');
  if(!grid) return;
  const status=document.getElementById('ttt-status');
  const reset=document.getElementById('ttt-reset');
  let board=Array(9).fill('');
  let player='X';
  const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  function draw(){
    grid.innerHTML='';
    board.forEach((mark,idx)=>{
      const cell=document.createElement('button');
      cell.className='ttt-cell';
      cell.textContent=mark;
      cell.addEventListener('click',()=>move(idx));
      grid.appendChild(cell);
    });
  }
  function move(i){
    if(board[i]||winner(board)) return;
    board[i]=player; draw();
    const w=winner(board);
    if(w){highlight(w.combo); status.textContent=`${w.mark} wins!`; return;}
    if(board.every(Boolean)){status.textContent='Draw!';return;}
    player = player==='X'?'O':'X';
    status.textContent=`${player==='X'?'Your':'Bot'} turn (${player})`;
    if(player==='O') setTimeout(aiMove,250);
  }
  function aiMove(){
    // simple AI: win > block > center > random
    const empty=board.map((v,i)=>v?null:i).filter(v=>v!==null);
    const tryLines=(mark)=>{
      for(const [a,b,c] of wins){
        const line=[board[a],board[b],board[c]];
        if(line.filter(v=>v===mark).length===2 && line.includes('')){
          const idx=[a,b,c][line.indexOf('')]; return idx;
        }
      }
      return null;
    };
    let idx=tryLines('O');
    if(idx===null) idx=tryLines('X');
    if(idx===null && !board[4]) idx=4;
    if(idx===null){ idx=empty[Math.floor(Math.random()*empty.length)]; }
    move(idx);
  }
  function winner(b){
    for(const combo of wins){
      const [a,b1,c]=combo; if(b[a]&&b[a]===b[b1]&&b[a]===b[c]) return {mark:b[a],combo};
    } return null;
  }
  function highlight(combo){
    const cells=[...grid.children];
    combo.forEach(i=>cells[i].classList.add('win'));
  }
  function restart(){board=Array(9).fill(''); player='X'; status.textContent='Your turn (X)'; draw();}
  reset.addEventListener('click',restart);
  draw();
}

function initNumberGuess(){
  const input=document.getElementById('num-input');
  if(!input) return;
  const submit=document.getElementById('num-submit');
  const status=document.getElementById('num-status');
  const newBtn=document.getElementById('num-new');
  let target = Math.floor(Math.random()*100)+1;
  function check(){
    const val=Number(input.value);
    if(!val){status.textContent='Enter a number 1-100';return;}
    if(val===target){status.textContent='🎉 Correct! New number set.'; target=Math.floor(Math.random()*100)+1; input.value='';}
    else if(val>target){status.textContent='Too high. Try smaller.'}
    else{status.textContent='Too low. Try bigger.'}
  }
  submit.addEventListener('click',check);
  input.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check();}});
  newBtn.addEventListener('click',()=>{target=Math.floor(Math.random()*100)+1;status.textContent='New number generated.';input.value='';});
}

function initTyping(){
  const textEl=document.getElementById('typing-text');
  if(!textEl) return;
  const input=document.getElementById('typing-input');
  const status=document.getElementById('typing-status');
  const restart=document.getElementById('typing-restart');
  const samples=[
    'Breathe in slowly, hold for a moment, and breathe out gently.',
    'Small breaks can refresh your mind and boost your focus.',
    'You are doing your best. Progress is better than perfection.',
    'A cup of water and a short walk can brighten your day.'
  ];
  let start=0, finished=false, target='';
  function newText(){
    target=samples[Math.floor(Math.random()*samples.length)];
    textEl.textContent=target; input.value=''; start=0; finished=false; status.textContent='Press any key to start';
  }
  function update(){
    const typed=input.value; if(!start && typed.length>0){start=Date.now();}
    const correct=typed===target.slice(0,typed.length);
    if(!correct){status.textContent='There is a typo, adjust and continue.';return;}
    if(typed.length===target.length){
      const durationSec=(Date.now()-start)/1000; const wpm=Math.round((target.split(/\s+/).length)/(durationSec/60));
      status.textContent=`Done in ${durationSec.toFixed(1)}s • ~${wpm} WPM`;
      finished=true; return;
    }
    const progress=Math.round((typed.length/target.length)*100);
    status.textContent=`${progress}% complete`;
  }
  input.addEventListener('input',()=>{if(!finished) update();});
  restart.addEventListener('click',()=>{newText();});
  newText();
}

