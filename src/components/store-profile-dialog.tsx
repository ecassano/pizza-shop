import { Button } from "./ui/button"
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

import { GetManagedRestaurant } from "@/api/get-managed-restaurant"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfile } from "@/api/update-profile"
import { toast } from "sonner"

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>;

const StoreProfileDialog = () => {
  const queryClient = useQueryClient();

  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: GetManagedRestaurant,
    staleTime: Infinity
  });

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? ''
    }
  });

  const updateManagedRestaurantCache = ({ name, description }: StoreProfileSchema) => {
    const cached = queryClient.getQueryData<GetManagedRestaurant>(['managed-restaurant']);

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurant>(['managed-restaurant'], {
        ...cached,
        name,
        description
      })
    }

    return { cached }
  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({ name, description }) {
      const { cached } = updateManagedRestaurantCache({ name, description });

      return { previousProfile: cached }
    },
    onError(_, _variables, context: { previousProfile: GetManagedRestaurant | undefined }) {
      if (context.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile);
      }
    }
  })

  const handleUpdateProfile = async (data: StoreProfileSchema) => {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description
      })

      toast.success('Perfil atualizado com sucesso!')
    } catch {
      toast.error('Perfil atualizado com sucesso!')
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>Atualize as informações do seu estabelecimento visíveis ao seu cliente</DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">Nome</Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
        </div>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="description">Descrição</Label>
            <Textarea className="col-span-3" id="description" {...register('description')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}

export default StoreProfileDialog