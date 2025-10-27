import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Switch } from './ui/switch';
import { Calendar, DollarSign, Tag, FileText, Repeat } from 'lucide-react';
import { Transaction, Category, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from './types';

interface EditTransactionProps {
  transaction: Transaction | null;
  onUpdateTransaction: (transaction: Transaction) => void;
  onClose: () => void;
}

const CATEGORIES: Record<'income' | 'expense', readonly string[]> = {
  income: [...INCOME_CATEGORIES, 'Other Income'],
  expense: [...EXPENSE_CATEGORIES, 'Insurance', 'Other Expense']
};

export function EditTransaction({ transaction, onUpdateTransaction, onClose }: EditTransactionProps) {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    category: '',
    description: '',
    date: '',
    recurring: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Populate form when transaction changes
  useEffect(() => {
    if (transaction) {
      setFormData({
        type: transaction.type,
        amount: transaction.amount.toString(),
        category: transaction.category,
        description: transaction.description || '',
        date: transaction.date,
        recurring: transaction.recurring || false
      });
      setErrors({});
    }
  }, [transaction]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !transaction) return;

    const updatedTransaction: Transaction = {
      ...transaction,
      type: formData.type,
      amount: parseFloat(formData.amount),
      category: formData.category as Category,
      description: formData.description.trim() || undefined,
      date: formData.date,
      recurring: formData.recurring
    };

    onUpdateTransaction(updatedTransaction);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      type: 'expense',
      amount: '',
      category: '',
      description: '',
      date: '',
      recurring: false
    });
    setErrors({});
    onClose();
  };

  if (!transaction) return null;

  return (
    <Dialog open={!!transaction} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border border-primary-200">
        <DialogHeader>
          <DialogTitle className="text-primary-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Edit Transaction
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Transaction Type */}
          <div className="space-y-2">
            <Label className="text-text-primary">Type</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={formData.type === 'income' ? 'default' : 'outline'}
                className={`flex-1 ${formData.type === 'income' 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'border-primary-200 text-text-secondary hover:bg-primary-50'}`}
                onClick={() => {
                  setFormData(prev => ({ 
                    ...prev, 
                    type: 'income',
                    category: '' // Reset category when type changes
                  }));
                  setErrors(prev => ({ ...prev, category: '' }));
                }}
              >
                Income
              </Button>
              <Button
                type="button"
                variant={formData.type === 'expense' ? 'default' : 'outline'}
                className={`flex-1 ${formData.type === 'expense' 
                  ? 'bg-orange-500 hover:bg-orange-600' 
                  : 'border-primary-200 text-text-secondary hover:bg-primary-50'}`}
                onClick={() => {
                  setFormData(prev => ({ 
                    ...prev, 
                    type: 'expense',
                    category: '' // Reset category when type changes
                  }));
                  setErrors(prev => ({ ...prev, category: '' }));
                }}
              >
                Expense
              </Button>
            </div>
          </div>

          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-text-primary flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Amount (₹)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, amount: e.target.value }));
                if (errors.amount) setErrors(prev => ({ ...prev, amount: '' }));
              }}
              className={`bg-input-background border-primary-200 focus:border-primary-500 ${
                errors.amount ? 'border-destructive' : ''
              }`}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount}</p>
            )}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-text-primary flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Category
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => {
                setFormData(prev => ({ ...prev, category: value }));
                if (errors.category) setErrors(prev => ({ ...prev, category: '' }));
              }}
            >
              <SelectTrigger className={`bg-input-background border-primary-200 focus:border-primary-500 ${
                errors.category ? 'border-destructive' : ''
              }`}>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-primary-200">
                {CATEGORIES[formData.type].map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category}
                    className="hover:bg-primary-50"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-text-primary flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description (Optional)
            </Label>
            <Input
              id="description"
              placeholder="Add a note..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="bg-input-background border-primary-200 focus:border-primary-500"
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-text-primary flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, date: e.target.value }));
                if (errors.date) setErrors(prev => ({ ...prev, date: '' }));
              }}
              className={`bg-input-background border-primary-200 focus:border-primary-500 ${
                errors.date ? 'border-destructive' : ''
              }`}
            />
            {errors.date && (
              <p className="text-sm text-destructive">{errors.date}</p>
            )}
          </div>

          {/* Recurring */}
          <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
            <Repeat className="h-4 w-4 text-primary-600" />
            <div className="flex-1">
              <Label htmlFor="recurring" className="text-primary-900">
                Recurring Transaction
              </Label>
              <p className="text-sm text-primary-700">
                Mark this as a recurring transaction
              </p>
            </div>
            <Switch
              id="recurring"
              checked={formData.recurring}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, recurring: checked }))}
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border-primary-200 text-text-secondary hover:bg-primary-50"
          >
            Cancel
          </Button>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleSubmit}
              className="bg-primary-500 hover:bg-primary-600 shadow-sm"
            >
              Update Transaction
            </Button>
          </motion.div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}