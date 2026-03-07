'use client';

import { useState } from 'react';
import { X, Send, FileText, Clock } from 'lucide-react';

export default function CreateProposalModal({ isOpen, onClose, onCreate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, description });
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#16161a] border border-zinc-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold">Create New Proposal</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Proposal Title</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-zinc-600" size={18} />
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Upgrade Protocol to V2"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this proposal will accomplish..."
              rows={4}
              className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2.5 px-4 focus:outline-none focus:border-purple-500 transition-colors resize-none"
              required
            />
          </div>

          <div className="bg-purple-500/5 p-4 rounded-xl border border-purple-500/10 flex gap-3">
            <Clock className="text-purple-500 shrink-0" size={20} />
            <p className="text-xs text-zinc-400">
              Voting will remain open for <span className="text-purple-400 font-bold">3 days</span>. 
              Once created, the proposal becomes immutable on-chain.
            </p>
          </div>

          <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2 h-12">
            <Send size={18} />
            Submit Proposal
          </button>
        </form>
      </div>
    </div>
  );
}
