import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

const OrderTableFilters = () => {
  return (
    <form className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input className="h-8 w-auto" placeholder="ID do pedido" />
      <Input className="h-8 w-[320px]" placeholder="Nome do cliente" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[320px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" variant="secondary" size="xs">
        <Search className="h-4 w-4 mr-2" />
        Filtrar resultados
      </Button>

      <Button type="button" variant="outline" size="xs">
        <X className="h-4 w-4 mr-2" />
        Remover filtros
      </Button>
    </form>
  )
}

export default OrderTableFilters