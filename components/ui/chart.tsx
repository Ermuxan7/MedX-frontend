"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const ChartContext = React.createContext<{
  config: Record<string, { label: string; color: string }>
} | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: Record<string, { label: string; color: string }>
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ className, children, config, ...props }, ref) => {
  return (
    <ChartContext.Provider value={{ config }}>
      <div ref={ref} className={cn("flex aspect-video justify-center text-xs", className)} {...props}>
        <RechartsPrimitive.ResponsiveContainer width="100%" height="100%">
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = RechartsPrimitive.Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(({ active, payload, className, indicator = "dot", hideLabel = false, hideIndicator = false, label }, ref) => {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className,
      )}
    >
      {!hideLabel && label && <div className="font-medium">{label}</div>}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${item.dataKey || item.name || "value"}`
          const itemConfig = config[key]

          return (
            <div key={`item-${index}`} className="flex w-full items-center gap-2">
              {!hideIndicator && (
                <div
                  className={cn("h-2 w-2 shrink-0 rounded-[2px]", {
                    "rounded-full": indicator === "dot",
                  })}
                  style={{
                    backgroundColor: item.color || itemConfig?.color,
                  }}
                />
              )}
              <div className="flex flex-1 justify-between gap-2">
                <span className="text-muted-foreground">{itemConfig?.label || item.name}</span>
                <span className="font-mono font-medium tabular-nums text-foreground">{item.value}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})
ChartTooltipContent.displayName = "ChartTooltipContent"

export { ChartContainer, ChartTooltip, ChartTooltipContent }
