# Custom Sidebar Configuration

This project uses a custom sidebar configuration to organize the navigation differently from the folder structure. This allows for a more flexible organization of content while maintaining stable URLs.

## How It Works

1. The sidebar structure is defined in `data/sidebar.yaml`
2. The sidebar template (`layouts/partials/sidebar.html`) reads this configuration
3. URLs remain based on the folder structure, but the sidebar organization can be completely customized

## Sidebar Configuration Structure

The sidebar configuration supports multiple levels of nesting:

```yaml
sidebar:
  - title: "Main Section"      # Top-level section
    weight: 1                  # Controls the order (lower numbers appear first)
    url: "/path/to/section/"   # Optional URL if the section itself is clickable
    items:                     # Child items in this section
      - title: "Subsection"    # Second-level section
        weight: 1              # Controls the order within this section
        items:                 # Child items in this subsection
          - title: "Page Title"
            url: "/path/to/page/"
      - title: "Regular Item"  # Regular item (no children)
        url: "/path/to/item/"
```

## Example

Here's an example of a multi-level sidebar configuration:

```yaml
sidebar:
  - title: "Founders Handbook"
    weight: 1
    url: "/docs/founders-handbook/"
    items:
      - title: "Raising your Seed"
        weight: 1
        items:
          - title: "Cap Table 101"
            url: "/docs/founders-handbook/cap-table-101/"
          - title: "Introduction to SAFEs"
            url: "/docs/founders-handbook/intro-to-safes/"
      
      - title: "Company Formation"
        weight: 2
        items:
          - title: "How to Pick a Startup Idea"
            url: "/docs/founders-handbook/how-to-pick-a-startup-idea/"
```

## Updating the Sidebar

To update the sidebar structure:

1. Edit the `data/sidebar.yaml` file
2. Add, remove, or reorder sections and items as needed
3. Make sure all URLs point to valid pages in your site
4. The weight parameter controls the order (lower numbers appear first)

## Benefits

- You can organize your sidebar in any way you want, regardless of the folder structure
- URLs remain based on the folder structure, maintaining stable links
- You can easily reorganize the sidebar without changing any content files
- You can create logical groupings that might not match the physical file organization
