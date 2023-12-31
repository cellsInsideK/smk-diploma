import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '../ui/textarea';
import { FileUploader } from '../shared/FileUploader';
import { Input } from '../ui/input';
import { postSchema } from '@/lib/validation';
import { Models } from 'appwrite';
import { useUserContext } from '@/context/AuthContext';
import { useToast } from '../ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { useCreatePost, useDeletePost, useUpdatePost } from '@/lib/react-query/queriesAndMutations';
import React from 'react';

interface PostFormProps {
  post?: Models.Document;
  action: 'create' | 'update';
}

export const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
  const { mutateAsync: deletePost, isPending: isLoadingDelete } = useDeletePost();

  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      caption: post ? post?.caption : '',
      file: [],
      location: post ? post?.location : '',
      tags: post ? post?.tags.join(', ') : '',
    },
  });

  async function onDelete(e: React.MouseEvent) {
    e.stopPropagation();
    const deleted = await deletePost({ postId: post!.$id, imageId: post?.imageId });
    if (!deleted) toast({ title: 'Ошибка удаления поста', variant: 'destructive' });
    return navigate('/');
  }

  async function onSubmit(values: z.infer<typeof postSchema>) {
    if (post && action === 'update') {
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost)
        toast({ title: 'Ошибка обновления, попробуйте еще раз!', variant: 'destructive' });

      return navigate(`/posts/${post.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost)
      toast({ title: 'Ошибка создания поста, попробуйте позже', variant: 'destructive' });

    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Текст</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  placeholder="Текст поста"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Добавьте фото</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Локация</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Добавьте теги (через запятую)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="shad-input"
                  placeholder="Диплом, крэк, девчули"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className=" flex gap-4 items-center justify-end">
          {post ? (
            <Button
              type="button"
              className="shad-button_dark_4"
              disabled={isLoadingCreate || isLoadingUpdate || isLoadingDelete}
              onClick={onDelete}>
              Удалить
            </Button>
          ) : null}
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate || isLoadingDelete}>
            {action === 'create' ? 'Создать' : 'Обновить'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
