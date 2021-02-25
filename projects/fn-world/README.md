# FnWorld

If Condition re-visited.

Ex:.

existing:
<br/>
<code> 
<pre>
if(condition) 
   execute;
else
  elseExecute; </pre>
</code>
Proposed:
<br/>
<code>
<pre>
let result = FnWorld.if(condition, ()=> execute, ()=> elseExecute);
let result = FnWorld.if(condition, returnValue, returnElseValue);
FnWorld.if(condition, ()=> execute);
let result = FnWorld.if(!condition, elseExecute);
</pre>
</code>
