import pandas as pd
import numpy as np

def clean_text(text):
    if pd.isna(text):
        return ""
    return str(text).strip().replace('\n', ' ').replace('\r', '')

def format_duration(weeks):
    try:
        weeks = float(weeks)
        if pd.isna(weeks):
            return "Duration not specified"
        if weeks == 1:
            return "1 week"
        return f"{int(weeks)} weeks"
    except:
        return "Duration not specified"

def format_rating(rating):
    try:
        rating = float(rating)
        if pd.isna(rating):
            return "Not rated"
        return f"{rating:.1f}/5.0"
    except:
        return "Not rated"

def transform_coursera_data():
    # Read the original CSV
    df = pd.read_csv('../data/Coursera.csv')
    
    # Clean and transform the data
    transformed_df = pd.DataFrame()
    
    # Basic information
    transformed_df['Course Name'] = df['Course Name'].apply(clean_text)
    transformed_df['University'] = df['University'].apply(clean_text)
    transformed_df['Difficulty Level'] = df['Difficulty Level'].apply(clean_text)
    transformed_df['Course Rating'] = df['Course Rating'].apply(format_rating)
    
    # Skills (clean and format)
    transformed_df['Skills Gained'] = df['Skills'].apply(lambda x: 
        ', '.join(sorted(set([s.strip() for s in str(x).split(',') if s.strip()]))) 
        if pd.notna(x) else "Not specified")
    
    # Course Description (clean and truncate if too long)
    transformed_df['Course Description'] = df['Course Description'].apply(
        lambda x: clean_text(x)[:500] + '...' if len(str(x)) > 500 else clean_text(x))
    
    # Add course URL
    transformed_df['Course URL'] = df['Course URL'].apply(clean_text)
    
    # Save to new CSV
    output_path = '../data/coursera_human_readable.csv'
    transformed_df.to_csv(output_path, index=False, encoding='utf-8')
    print(f"Transformed CSV saved to: {output_path}")
    
    # Print some statistics
    print("\nDataset Statistics:")
    print(f"Total number of courses: {len(transformed_df)}")
    print(f"Universities represented: {transformed_df['University'].nunique()}")
    print(f"Difficulty levels available: {sorted(transformed_df['Difficulty Level'].unique())}")
    
if __name__ == "__main__":
    transform_coursera_data()
