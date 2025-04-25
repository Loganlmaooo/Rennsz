
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
    try {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/admin/enhance", { prompt });
      
      toast({
        title: "Enhancement Complete",
        description: "Code changes have been applied successfully",
        variant: "default",
      });
      
      setPrompt("");
    } catch (error) {
      toast({
        title: "Enhancement Failed",
        description: `Failed to apply changes: ${error}`,
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
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the enhancement you'd like to make..."
          className="min-h-[100px] mb-4 bg-zinc-900 border-primary/30"
        />
        <Button
          onClick={handleEnhancement}
          className="gold-gradient text-black font-bold hover:opacity-90"
          disabled={isLoading || !prompt}
        >
          {isLoading ? (
            <span className="flex items-center">
              <i className="fas fa-circle-notch fa-spin mr-2"></i>
              Enhancing...
            </span>
          ) : (
            "Enhance Code"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
