rm -rf node_modules
rm -rf .turbo
rm -rf pnpm-lock.yaml

rm -rf packages/*/{node_modules,.next,.turbo,.cache,dist}
rm -rf apps/*/{node_modules,.next,.turbo,.cache,dist}