#!/bin/bash

# Service slugs for all 22 services
services=(
  "air-conditioner-installation"
  "air-conditioner-maintenance"
  "air-conditioner-repair"
  "air-filtration-air-purifiers"
  "boiler-installation"
  "boiler-maintenance"
  "boiler-repair"
  "commercial-hvac"
  "dehumidifiers"
  "ductless-mini-split"
  "furnace-installation"
  "furnace-maintenance"
  "furnace-repair"
  "heat-pump-installation"
  "heat-pump-maintenance"
  "heat-pump-repair"
  "hrv-erv-ventilation"
  "humidifiers"
  "maintenance-plans"
  "rooftop-units"
  "tank-water-heaters"
  "tankless-water-heaters"
)

# Service names for titles
declare -A service_names=(
  ["air-conditioner-installation"]="Air Conditioner Installation"
  ["air-conditioner-maintenance"]="Air Conditioner Maintenance"
  ["air-conditioner-repair"]="Air Conditioner Repair"
  ["air-filtration-air-purifiers"]="Air Filtration & Air Purifiers"
  ["boiler-installation"]="Boiler Installation"
  ["boiler-maintenance"]="Boiler Maintenance"
  ["boiler-repair"]="Boiler Repair"
  ["commercial-hvac"]="Commercial HVAC"
  ["dehumidifiers"]="Dehumidifiers"
  ["ductless-mini-split"]="Ductless Mini-Split"
  ["furnace-installation"]="Furnace Installation"
  ["furnace-maintenance"]="Furnace Maintenance"
  ["furnace-repair"]="Furnace Repair"
  ["heat-pump-installation"]="Heat Pump Installation"
  ["heat-pump-maintenance"]="Heat Pump Maintenance"
  ["heat-pump-repair"]="Heat Pump Repair"
  ["hrv-erv-ventilation"]="HRV/ERV Ventilation"
  ["humidifiers"]="Humidifiers"
  ["maintenance-plans"]="Maintenance Plans"
  ["rooftop-units"]="Rooftop Units"
  ["tank-water-heaters"]="Tank Water Heaters"
  ["tankless-water-heaters"]="Tankless Water Heaters"
)

for service in "${services[@]}"; do
  file_path="src/content/service-city/${service}/guelph.md"
  service_name="${service_names[$service]}"

  cat > "$file_path" <<EOF
---
serviceSlug: '${service}'
locationSlug: 'guelph'
title: '${service_name} in Guelph, ON'
seoTitle: '${service_name} Guelph ON | B.A.P Heating & Cooling'
seoDescription: 'Professional ${service_name,,} in Guelph, ON. TSSA-certified technicians. Serving Guelph since 1992.'
workflowStatus: 'draft'
---

# ${service_name} in Guelph, ON

Content to be generated.
EOF

  echo "Created: $file_path"
done

echo "✅ All 22 Guelph skeleton files created"
