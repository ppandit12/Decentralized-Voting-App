'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProposalCard from '@/components/ProposalCard';
import CreateProposalModal from '@/components/CreateProposalModal';
import { PlusCircle, Info, Landmark, Users, Search, Target } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Integrate Chainlink Data Feeds for L2",
      description: "Upgrade the pricing mechanism to use Chainlink decentralized oracles for more robust and manipulation-resistant price feeds on Arbitrum and Optimism.",
      voteCountAsYes: 1250000,
      voteCountAsNo: 400000,
      active: true,
      timeLeft: "1d 12h 45m"
    },
    {
      id: 2,
      title: "Treasury Buyback & Burn Program",
      description: "Allocate 15% of protocol revenue to buy back VTK tokens from the open market and burn them to reduce total supply.",
      voteCountAsYes: 890000,
      voteCountAsNo: 120000,
      active: true,
      timeLeft: "2d 08h 12m"
    },
    {
      id: 3,
      title: "Governance V2: Quadratic Voting Implementation",
      description: "Transition to a quadratic voting model to prevent whale dominance and give more voice to smaller token holders.",
      voteCountAsYes: 3200000,
      voteCountAsNo: 50000,
      active: false,
      timeLeft: "Ended"
    }
  ]);

  const handleCreateProposal = (newProposal) => {
    const proposal = {
      id: proposals.length + 1,
      ...newProposal,
      voteCountAsYes: 0,
      voteCountAsNo: 0,
      active: true,
      timeLeft: "3d 00h 00m"
    };
    setProposals([proposal, ...proposals]);
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full -z-10"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full -z-10"></div>
      
      <Navbar />
      
      <div className="max-w-7xl mx-auto relative">
        {/* Banner Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Target size={14} />
            DAO Governance Active
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">
                The Future of <br/><span className="gradient-text">Protocol Voting</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Empower your community. Propose updates, cast your votes, and shape the direction 
                of the ecosystem with our transparent blockchain-based governance.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center gap-2 h-14 px-8 text-lg"
            >
              <PlusCircle size={22} />
              Create Proposal
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            { label: 'Proposals', value: proposals.length, icon: Landmark, color: 'text-purple-500' },
            { label: 'Active Voters', value: '1,284', icon: Users, color: 'text-blue-500' },
            { label: 'Total Votes', value: '4.2M VTK', icon: Target, color: 'text-green-500' },
            { label: 'Quorum', value: '65%', icon: Info, color: 'text-zinc-500' }
          ].map((stat, i) => (
            <div key={i} className="card flex flex-col gap-4">
              <div className={`w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center ${stat.color} border border-zinc-800`}>
                <stat.icon size={20} />
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">{stat.label}</p>
                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Search & Tabs */}
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10 items-center">
          <div className="flex gap-1 p-1 bg-zinc-900 rounded-xl border border-zinc-800 w-full md:w-auto">
            {['All', 'Active', 'Passed', 'Closed'].map((tab) => (
              <button 
                key={tab}
                className={`flex-1 md:flex-none px-6 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === 'All' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input 
              type="text" 
              placeholder="Search proposals..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-purple-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Proposals List */}
        <div className="grid grid-cols-1 gap-6">
          {proposals.map(proposal => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>

      <CreateProposalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateProposal}
      />
    </main>
  );
}
