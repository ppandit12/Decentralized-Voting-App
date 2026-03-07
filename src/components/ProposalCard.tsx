'use client';

import { ThumbsUp, ThumbsDown, Calendar, Hash } from 'lucide-react';

export default function ProposalCard({ proposal, onVote }) {
  const isPassed = proposal.voteCountAsYes > proposal.voteCountAsNo && !proposal.active;
  
  return (
    <div className="card group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {proposal.active ? (
              <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider rounded border border-purple-500/20">Active</span>
            ) : isPassed ? (
              <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider rounded border border-green-500/20">Passed</span>
            ) : (
              <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-wider rounded border border-red-500/20">Rejected</span>
            )}
            <span className="text-xs text-zinc-500 flex items-center gap-1">
              <Hash size={12} />
              {proposal.id.toString().padStart(3, '0')}
            </span>
          </div>
          <h3 className="text-xl font-bold group-hover:text-purple-400 transition-colors uppercase tracking-tight">{proposal.title}</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Ends in</p>
          <p className="text-sm font-bold font-mono text-zinc-300">{proposal.timeLeft}</p>
        </div>
      </div>
      
      <p className="text-zinc-400 mb-6 max-w-3xl line-clamp-2">
        {proposal.description}
      </p>

      <div className="flex flex-col md:flex-row items-center gap-8 pt-6 border-t border-zinc-800/50">
        <div className="flex-1 w-full">
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-2">
            <span className="text-zinc-400">Yes: {proposal.voteCountAsYes.toLocaleString()} VTK</span>
            <span className="text-zinc-400">No: {proposal.voteCountAsNo.toLocaleString()} VTK</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden flex">
            <div 
              className="h-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]" 
              style={{ width: `${(proposal.voteCountAsYes / (proposal.voteCountAsYes + proposal.voteCountAsNo || 1)) * 100}%` }}
            ></div>
            <div 
              className="h-full bg-zinc-700" 
              style={{ width: `${(proposal.voteCountAsNo / (proposal.voteCountAsYes + proposal.voteCountAsNo || 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {proposal.active && (
          <div className="flex gap-3">
            <button 
              onClick={() => onVote(proposal.id, true)}
              className="flex items-center gap-2 px-6 py-2 bg-purple-600/10 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/30 rounded-xl transition-all font-bold text-xs uppercase tracking-widest active:scale-95"
            >
              <ThumbsUp size={14} />
              Vote Yes
            </button>
            <button 
              onClick={() => onVote(proposal.id, false)}
              className="flex items-center gap-2 px-6 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white border border-zinc-700 rounded-xl transition-all font-bold text-xs uppercase tracking-widest active:scale-95"
            >
              <ThumbsDown size={14} />
              Vote No
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
