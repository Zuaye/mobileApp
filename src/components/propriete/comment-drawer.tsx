"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import { ScrollArea } from "@/src/components/ui/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { motion } from "framer-motion";

interface Comment {
  id: string;
  text: string;
  author: {
    name: string;
    avatar?: string;
  };
  createdAt: Date;
}

interface CommentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  comments: Comment[];
  onAddComment: (propertyId: string, comment: string) => void;
}

export function CommentDrawer({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  comments,
  onAddComment,
}: CommentDrawerProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(propertyId, newComment);
      setNewComment("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="h-[70vh] w-full md:max-w-[70%] max-w-[90%] mx-auto p-6 rounded-t-3xl border-t border-slate-200 dark:border-slate-700"
      >
        <div className="absolute left-1/2 -translate-x-1/2 -top-3 w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full" />

        <SheetHeader className="space-y-1">
          <SheetTitle className="text-xl font-semibold text-slate-900 dark:text-white">
            Commentaires
          </SheetTitle>
          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
            {propertyTitle}
          </p>
        </SheetHeader>

        <div className="mt-6 flex flex-col h-[calc(100%-180px)]">
          <ScrollArea className="flex-1 pr-4">
            {comments.length > 0 ? (
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {comment.author.name}
                        </p>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {formatDistanceToNow(comment.createdAt, {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                        {comment.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center justify-center h-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate-500 dark:text-slate-400">
                  Aucun commentaire pour le moment
                </p>
              </motion.div>
            )}
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-4 sticky bottom-0 bg-white dark:bg-slate-900 pt-4 border-t border-slate-200 dark:border-slate-700"
          >
            <Textarea
              placeholder="Ajouter un commentaire..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[100px] bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-[#f39200] focus:border-[#f39200] resize-none"
            />
            <Button
              type="submit"
              className="w-full bg-[#f39200] hover:bg-[#f39200]/90 text-white"
              disabled={!newComment.trim()}
            >
              Publier
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
