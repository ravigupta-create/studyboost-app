'use client';
import { useState } from 'react';
import { useGeminiStream } from '@/hooks/useGemini';
import { useApiKey } from '@/hooks/useApiKey';
import { ApiKeySetup } from '@/components/shared/ApiKeySetup';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { Spinner } from '@/components/ui/Spinner';
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

export default function ArgumentPage() {
  const { hasKey } = useApiKey();
  const { output, loading, generate, stop } = useGeminiStream();
  const [claim, setClaim] = useState('');

  if (!hasKey) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <PageHeader icon="⚔️" title="Argument Builder" description="Build a bulletproof argument using the Toulmin model." aiPowered />
      <ApiKeySetup />
    </div>
  );

  const handleGenerate = () => {
    if (!claim.trim() || loading) return;
    generate(`You are a rhetoric and argumentation professor. Build a complete, persuasive argument using the Toulmin model for the following claim. Make it academically rigorous and suitable for a college-level essay or debate.

**Claim to argue:** "${claim}"

## ⚔️ Toulmin Argument Builder

### 1. 📌 Claim (Thesis)
Refine and state the claim clearly and precisely. Make it arguable, specific, and defensible.

### 2. 📊 Grounds (Evidence)
Provide 3-4 strong pieces of evidence that support the claim:
- **Evidence 1:** [Specific data, study, fact, or example] — Source type and how to find it
- **Evidence 2:** [Different type of evidence] — Source type and how to find it
- **Evidence 3:** [Another supporting piece] — Source type and how to find it
- **Evidence 4:** [Optional additional evidence]

For each piece of evidence, explain exactly HOW it supports the claim.

### 3. 🔗 Warrant (Reasoning)
The logical connection between the evidence and the claim. Explain:
- Why does this evidence actually prove the claim?
- What assumption or principle connects them?
- Write 2-3 warrant statements that bridge evidence to claim

### 4. 🏛️ Backing (Support for Warrant)
Additional support that strengthens the warrant itself:
- Why should we trust the logical connection?
- What established theories, principles, or precedents support the reasoning?
- Expert opinions or established frameworks that validate the warrant

### 5. ⚠️ Qualifier (Limitations)
Honest acknowledgment of the argument's scope:
- Under what conditions is this claim true?
- How certain can we be? (certainly, probably, likely, possibly)
- What exceptions exist?
- Qualifying language to use: [specific phrases]

### 6. 🔄 Rebuttal (Counterargument + Response)
**Strongest Counterargument:** [State the best opposing argument]
**Why it seems compelling:** [Acknowledge its strength honestly]
**Response:** [Systematically address and refute it with evidence and logic]

**Second Counterargument:** [Another opposing view]
**Response:** [Address it]

### 📝 Complete Argument Paragraph
Write a full argumentative paragraph (6-8 sentences) that weaves all Toulmin elements together into a cohesive, persuasive argument. Label each sentence with its Toulmin component in brackets.

### 💡 Argumentation Tips
3 specific tips for making this particular argument more persuasive in an essay or debate context.`);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <PageHeader icon="⚔️" title="Argument Builder" description="Build a bulletproof argument using the Toulmin model." aiPowered />
      <Card className="mb-6">
        <Textarea value={claim} onChange={e => setClaim(e.target.value)} placeholder="Enter a claim you want to argue...&#10;&#10;Examples:&#10;• School uniforms improve academic performance&#10;• Social media does more harm than good for teenagers&#10;• Space exploration funding should be increased" rows={4} />
        <div className="mt-4 flex gap-2">
          <Button onClick={handleGenerate} disabled={loading || !claim.trim()}>
            {loading ? <><Spinner /> Building Argument...</> : 'Build Argument'}
          </Button>
          {loading && <Button variant="secondary" onClick={stop}>Stop</Button>}
        </div>
      </Card>
      {output && (
        <Card>
          <MarkdownRenderer content={output} />
        </Card>
      )}
    </div>
  );
}
