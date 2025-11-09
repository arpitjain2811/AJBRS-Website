module Jekyll
  module StatsFilter
    def count_recipients(site)
      # Find the past_recipients.md page
      recipients_page = site['pages'].find { |page| page['name'] == 'past_recipients.md' }
      return 0 unless recipients_page

      content = recipients_page['content']
      
      # Count lines that start with * (excluding headers)
      recipient_lines = content.scan(/^\* /)
      
      recipient_lines.length
    end

    def count_publications(site)
      # Find the publications.md page
      publications_page = site['pages'].find { |page| page['name'] == 'publications.md' }
      return 0 unless publications_page

      content = publications_page['content']
      
      # Count lines that start with * (excluding headers)
      publication_lines = content.scan(/^\* /)
      
      publication_lines.length
    end

    def calculate_scholarships(publications_count)
      (publications_count.to_i * 10000)
    end

    def format_currency(amount)
      amount = amount.to_i
      if amount >= 100000
        "₹#{(amount / 1000).to_i}K"
      elsif amount >= 1000
        "₹#{(amount / 1000.0).round(1)}K"
      else
        "₹#{amount}"
      end
    end
  end
  
  class StatsCalculator < Generator
    safe true
    priority :highest

    def generate(site)
      # Read content directly from files
      recipients_content = File.read(File.join(site.source, 'past_recipients.md'))
      publications_content = File.read(File.join(site.source, 'publications.md'))
      
      # Count recipients and publications
      recipients_count = recipients_content.scan(/^\* /).length
      publications_count = publications_content.scan(/^\* /).length
      
      # Calculate scholarships granted
      scholarships_granted = publications_count * 10000
      
      # Debug output
      puts "Stats Calculator: Recipients: #{recipients_count}, Publications: #{publications_count}, Scholarships: #{scholarships_granted}"
      
      # Store the data in site.data
      site.data['stats'] = {
        'recipients_count' => recipients_count,
        'publications_count' => publications_count,
        'scholarships_granted' => scholarships_granted,
        'scholarships_granted_formatted' => format_currency(scholarships_granted)
      }
    end
    
    private
    
    def format_currency(amount)
      if amount >= 100000
        "₹#{(amount / 1000).to_i}K"
      elsif amount >= 1000
        "₹#{(amount / 1000.0).round(1)}K"
      else
        "₹#{amount}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::StatsFilter)