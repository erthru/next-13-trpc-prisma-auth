import { TRPCError, initTRPC } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();
export const router = t.router;
export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "unauthorized",
    });
  }

  return next();
});
