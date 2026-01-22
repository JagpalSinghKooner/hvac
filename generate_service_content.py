#!/usr/bin/env python3
import yaml
import sys

# This script generates YAML-safe service content
# Output will be properly escaped YAML that can be inserted into MD files

services_data = {
    "furnace-installation": {
        "title": "Furnace Installation",
        "description": "Professional high-efficiency furnace installation for Ontario homes. 30+ years experience, proper sizing guaranteed, 10-year warranty, and full rebate assistance.",
        "category": "heating",
        "serviceType": "installation",
        "seoTitle": "Furnace Installation Ontario | High-Efficiency | 10-Year Warranty",
        "seoDescription": "Professional furnace installation with proper sizing, 10-year warranty, and rebate assistance. TSSA-certified installers serving Southern Ontario since 1994.",
        "problemStatement": {
            "headline": "Your Old Furnace is Costing You Hundreds Every Year",
            "description": "Furnaces over 15 years old operate at just 60-80% efficiency. That means 20-40 cents of every heating dollar escapes through your exhaust. In a typical Ontario winter, this inefficiency costs $400-$800 annually in wasted fuel. Add repair bills averaging $300-$600 per visit, and your old furnace becomes an expensive liability. The question is not if it will break down mid-winter, but when.",
            "painPoints": [
                "Heating bills 30-50% higher than neighbors with modern high-efficiency systems",
                "Repair costs adding up every year while furnace reliability decreases",
                "Uneven temperatures with some rooms freezing and others overheating",
                "Furnace age over 15 years means you are living on borrowed time each winter",
                "Worry about breakdown when you need heat most and contractors are swamped"
            ]
        },
        "solution Approach": {
            "headline": "Proper Sizing and Quality Installation for 15-20 Years of Reliable Heat",
            "description": "After installing furnaces across Southern Ontario for 30 years, we know that proper sizing matters more than brand name. An oversized furnace short-cycles and wears out fast. An undersized furnace runs constantly and cannot keep up. We start every installation with a Manual J heat loss calculation to determine exactly what your home needs. Our TSSA-certified installers follow manufacturer specifications precisely, protecting your warranty and ensuring safe, efficient operation from day one.",
            "differentiators": [
                "Manual J heat loss calculation for every home ensures proper sizing not guesswork",
                "10-year parts and labour warranty far exceeds industry standard of 1-2 years",
                "Complete rebate application handling so you receive every available dollar",
                "30+ years installing furnaces in Ontario means we know what works long-term",
                "Transparent upfront pricing with no hidden fees or surprise charges",
                "One-day installation for most homes with minimal disruption to your routine"
            ]
        }
    }
}

# Print as YAML
print(yaml.dump(services_data, default_flow_style=False, allow_unicode=True, sort_keys=False))
