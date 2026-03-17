import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb/connect';
import Project from '@/lib/mongodb/models/Project';

async function updateProjectOrders() {
  await connectDB();

  // Define the specific order mappings
  const orderMappings = [
    { title: "AlgoFlow master DSA", order: 1 },
    { title: "Taskly", order: 2 }
  ];

  // Update specific projects with their order
  for (const mapping of orderMappings) {
    await Project.updateOne(
      { title: { $regex: new RegExp(mapping.title, 'i') } }, // Case-insensitive search
      { $set: { order: mapping.order } }
    );
  }

  // Get all projects that don't have order 1 or 2 and assign them incrementing orders starting from 3
  const otherProjects = await Project.find({
    order: { $nin: [1, 2] }
  }).sort({ createdAt: 1 }); // Sort by creation date to maintain some consistency

  let currentOrder = 3;
  for (const project of otherProjects) {
    await Project.updateOne(
      { _id: project._id },
      { $set: { order: currentOrder } }
    );
    currentOrder++;
  }

  // Get all projects to return the updated list
  const updatedProjects = await Project.find({}).sort({ order: 1 });

  return {
    success: true,
    message: 'Project orders updated successfully',
    projects: updatedProjects
  };
}

export async function GET() {
  try {
    const result = await updateProjectOrders();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating project orders:', error);
    return NextResponse.json(
      { error: 'Failed to update project orders' },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await updateProjectOrders();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating project orders:', error);
    return NextResponse.json(
      { error: 'Failed to update project orders' },
      { status: 500 }
    );
  }
}