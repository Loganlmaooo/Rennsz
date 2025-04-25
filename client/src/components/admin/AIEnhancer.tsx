
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function AIEnhancer() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleEnhancement = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/admin/ai/enhance", { prompt });
      
      toast({
        title: "Enhancement Complete",
        description: "AI suggestions have been generated",
        variant: "default",
      });
      
      setPrompt("");
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="glass">
      <CardContent className="pt-6">
        <h3 className="text-lg font-bold mb-4">AI Code Enhancement</h3>
        <p className="text-gray-400 mb-4">
          Enter a description of what you'd like to enhance or analyze in your code.
        </p>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Example: Analyze performance bottlenecks in the dashboard component"
          className="min-h-[100px] mb-4 bg-zinc-900 border-primary/30"
        />
        <Button
          onClick={handleEnhancement}
          className="gold-gradient text-black font-bold hover:opacity-90"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <span className="flex items-center">
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              Processing...
            </span>
          ) : (
            "Analyze Code"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
