-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "icon" TEXT,
    "image" TEXT,
    "tag" TEXT,
    "projects" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_features" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_packages" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "deliveryDays" INTEGER NOT NULL,
    "revisions" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "package_features" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "package_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_related_posts" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "href" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "service_related_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_items" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "serviceId" TEXT,
    "title" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "longDescription" TEXT,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "challenge" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "reviews" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "featured_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_item_features" (
    "id" TEXT NOT NULL,
    "featuredItemId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "featured_item_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_item_techs" (
    "id" TEXT NOT NULL,
    "featuredItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "featured_item_techs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_item_packages" (
    "id" TEXT NOT NULL,
    "featuredItemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "description" TEXT NOT NULL,
    "deliveryDays" INTEGER NOT NULL,
    "revisions" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "featured_item_packages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_item_package_features" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "featured_item_package_features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "featured_item_images" (
    "id" TEXT NOT NULL,
    "featuredItemId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "featured_item_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_slug_idx" ON "services"("slug");

-- CreateIndex
CREATE INDEX "services_isActive_idx" ON "services"("isActive");

-- CreateIndex
CREATE INDEX "service_features_serviceId_idx" ON "service_features"("serviceId");

-- CreateIndex
CREATE INDEX "service_packages_serviceId_idx" ON "service_packages"("serviceId");

-- CreateIndex
CREATE INDEX "package_features_packageId_idx" ON "package_features"("packageId");

-- CreateIndex
CREATE INDEX "service_related_posts_serviceId_idx" ON "service_related_posts"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "featured_items_slug_key" ON "featured_items"("slug");

-- CreateIndex
CREATE INDEX "featured_items_serviceId_idx" ON "featured_items"("serviceId");

-- CreateIndex
CREATE INDEX "featured_items_slug_idx" ON "featured_items"("slug");

-- CreateIndex
CREATE INDEX "featured_items_isActive_idx" ON "featured_items"("isActive");

-- CreateIndex
CREATE INDEX "featured_item_features_featuredItemId_idx" ON "featured_item_features"("featuredItemId");

-- CreateIndex
CREATE INDEX "featured_item_techs_featuredItemId_idx" ON "featured_item_techs"("featuredItemId");

-- CreateIndex
CREATE INDEX "featured_item_packages_featuredItemId_idx" ON "featured_item_packages"("featuredItemId");

-- CreateIndex
CREATE INDEX "featured_item_package_features_packageId_idx" ON "featured_item_package_features"("packageId");

-- CreateIndex
CREATE INDEX "featured_item_images_featuredItemId_idx" ON "featured_item_images"("featuredItemId");

-- AddForeignKey
ALTER TABLE "service_features" ADD CONSTRAINT "service_features_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_packages" ADD CONSTRAINT "service_packages_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "package_features" ADD CONSTRAINT "package_features_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "service_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_related_posts" ADD CONSTRAINT "service_related_posts_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_items" ADD CONSTRAINT "featured_items_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_item_features" ADD CONSTRAINT "featured_item_features_featuredItemId_fkey" FOREIGN KEY ("featuredItemId") REFERENCES "featured_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_item_techs" ADD CONSTRAINT "featured_item_techs_featuredItemId_fkey" FOREIGN KEY ("featuredItemId") REFERENCES "featured_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_item_packages" ADD CONSTRAINT "featured_item_packages_featuredItemId_fkey" FOREIGN KEY ("featuredItemId") REFERENCES "featured_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_item_package_features" ADD CONSTRAINT "featured_item_package_features_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "featured_item_packages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "featured_item_images" ADD CONSTRAINT "featured_item_images_featuredItemId_fkey" FOREIGN KEY ("featuredItemId") REFERENCES "featured_items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
